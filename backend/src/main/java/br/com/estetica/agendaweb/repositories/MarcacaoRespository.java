package br.com.estetica.agendaweb.repositories;

import br.com.estetica.agendaweb.model.Marcacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcacaoRespository extends JpaRepository<Marcacao, Long> {
}
