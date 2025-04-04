package br.com.estetica.agendaweb.repositories;

import br.com.estetica.agendaweb.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}
