package br.com.estetica.agendaweb.repositories;

import br.com.estetica.agendaweb.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
