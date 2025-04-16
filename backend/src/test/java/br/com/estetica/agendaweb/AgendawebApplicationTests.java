package br.com.estetica.agendaweb;

import br.com.estetica.agendaweb.dto.ProcedimentoDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Profile;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(value = "local")
class AgendawebApplicationTests {

	@LocalServerPort
	private int port;

	@Test
	void contextLoads() {
	}

	@Test
	public void testStressGetAllProcedures() throws InterruptedException {
		System.out.println("porta: " + String.valueOf(port));

		String url = "http://localhost:" + String.valueOf(port) + "/api/procedure/getAll";

		int threads = 50;
		int totalRequisicaoParaCadaThread = 10;

		ExecutorService executorService = Executors.newFixedThreadPool(threads);

		RestTemplate restTemplate = new RestTemplate();

		for (int i = 0; i < threads; i++) {
			executorService.submit(() -> {
				ParameterizedTypeReference<List<ProcedimentoDTO>> responseType =
						new ParameterizedTypeReference<List<ProcedimentoDTO>>() {};

				for (int j = 0; j < totalRequisicaoParaCadaThread; j++) {
					try {
						List<ProcedimentoDTO> procedimentos = restTemplate.exchange(
								url,
								HttpMethod.GET,
								null,
								responseType
						).getBody();

						System.out.println("Procedimentos retornados: " + procedimentos.size());
					} catch (Exception e) {
						System.err.println("Erro na requisição: " + e.getMessage());
					}
				}
			});
		}


		executorService.shutdown();
		executorService.awaitTermination(5, TimeUnit.MINUTES);

		log.info("teste stress finalizado");
	}


}
