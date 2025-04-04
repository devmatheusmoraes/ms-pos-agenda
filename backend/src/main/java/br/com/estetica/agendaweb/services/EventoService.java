package br.com.estetica.agendaweb.services;

import br.com.estetica.agendaweb.model.Evento;

import java.util.List;
import java.util.Optional;

public interface EventoService {

    void save(Evento evento);

    Optional<Evento> findById(Long id);

    List<Evento> findAll();

    void update(Long id, Evento eventoAtualizado);

    void deleteById(Long id);

}
