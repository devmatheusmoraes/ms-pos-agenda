package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.model.AgendaConfiguracao;
import br.com.estetica.agendaweb.repositories.AgendaConfiguracaoRepository;
import br.com.estetica.agendaweb.services.AgendaConfiguracaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AgendaConfiguracaoServiceImpl implements AgendaConfiguracaoService {

    private final AgendaConfiguracaoRepository agendaConfiguracaoRepository;

    @Override
    public void save(AgendaConfiguracao agendaConfiguracao) {
        agendaConfiguracao.getEventos().forEach(evento -> {
            Optional<AgendaConfiguracao> agendas = agendaConfiguracaoRepository.findFirstByIdNotAndDiaSemana(agendaConfiguracao.getProfissional().getId(), agendaConfiguracao.getDiaSemana());
            if (agendas.isPresent()) {
                try {
                    throw new Exception("Já existe configuração de agenda para a agenda informada.");
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        });
        agendaConfiguracaoRepository.save(agendaConfiguracao);
    }

    @Override
    public Optional<AgendaConfiguracao> findById(Long id) {
        return agendaConfiguracaoRepository.findById(id);
    }

    @Override
    public List<AgendaConfiguracao> findAll() {
        return agendaConfiguracaoRepository.findAll();
    }

    @Override
    public void update(Long id, AgendaConfiguracao agendaConfiguracaoAtualizado) {
        agendaConfiguracaoAtualizado.setId(id);
        agendaConfiguracaoRepository.save(agendaConfiguracaoAtualizado);
    }

    @Override
    public void deleteById(Long id) {
        agendaConfiguracaoRepository.deleteById(id);
    }
}
