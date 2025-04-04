package br.com.estetica.agendaweb.services.impl;

import br.com.estetica.agendaweb.model.Evento;
import br.com.estetica.agendaweb.repositories.EventoRepository;
import br.com.estetica.agendaweb.services.EventoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EventoServiceImpl implements EventoService {

    private final EventoRepository eventoRepository;

    @Override
    public void save(Evento evento) {
        eventoRepository.save(evento);
    }

    @Override
    public Optional<Evento> findById(Long id) {
        return eventoRepository.findById(id);
    }

    @Override
    public List<Evento> findAll() {
        return eventoRepository.findAll();
    }

    @Override
    public void update(Long id, Evento eventoAtualizado) {
        eventoAtualizado.setId(id);
        eventoRepository.save(eventoAtualizado);
    }

    @Override
    public void deleteById(Long id) {
        eventoRepository.deleteById(id);
    }

}
