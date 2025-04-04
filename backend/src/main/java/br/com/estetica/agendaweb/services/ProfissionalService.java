package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.model.Profissional;

import java.util.List;
import java.util.Optional;

public interface ProfissionalService {

    void save(Profissional profissional);

    Optional<Profissional> findById(Long id);

    List<Profissional> findAll();

    void update(Long id,Profissional profissionalAtualizado);

    void delete(Long id);
}
