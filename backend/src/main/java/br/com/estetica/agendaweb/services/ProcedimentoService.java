package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.model.Procedimento;

import java.util.List;
import java.util.Optional;

public interface ProcedimentoService {

    void save(Procedimento procedimento);

    Optional<Procedimento> findByID(Long id);

    List<Procedimento> findAll();

    void update(Long id, Procedimento procedimentoAtualizado);

    void deleteById(Long id);
}
