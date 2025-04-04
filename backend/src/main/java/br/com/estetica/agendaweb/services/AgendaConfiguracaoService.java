package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.model.AgendaConfiguracao;

import java.util.List;
import java.util.Optional;

public interface AgendaConfiguracaoService {

    void save(AgendaConfiguracao agendaConfiguracao);

    Optional<AgendaConfiguracao> findById(Long id);

    List<AgendaConfiguracao> findAll();

    void update(Long id, AgendaConfiguracao agendaConfiguracaoAtualizado);

    void deleteById(Long id);
}
