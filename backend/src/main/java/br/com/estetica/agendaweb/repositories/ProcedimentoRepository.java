package br.com.estetica.agendaweb.repositories;

import br.com.estetica.agendaweb.model.Procedimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcedimentoRepository extends JpaRepository<Procedimento, Long> {
}
