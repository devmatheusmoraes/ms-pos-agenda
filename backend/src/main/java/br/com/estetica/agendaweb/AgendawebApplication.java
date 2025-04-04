package br.com.estetica.agendaweb;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
		info = @Info(
				title = "API de Gerenciamento de Movimentações de Agenda",
				version = "1.0.0",
				description = "Esta é uma API para gerenciar agenda de uma loja ou qualquer outra entidade",
				contact = @Contact(name = "Equipe de Desenvolvimento", email = "digomillac@live.com"),
				license = @License(name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0")
		)
)
@SpringBootApplication
public class AgendawebApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendawebApplication.class, args);
	}

}
