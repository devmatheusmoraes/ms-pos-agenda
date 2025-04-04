package br.com.estetica.agendaweb.repositories;

import br.com.estetica.agendaweb.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfissionalRespository extends JpaRepository<Profissional, Long> {
}
