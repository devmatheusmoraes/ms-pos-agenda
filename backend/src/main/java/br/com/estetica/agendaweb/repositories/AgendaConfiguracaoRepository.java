package br.com.estetica.agendaweb.repositories;

import br.com.estetica.agendaweb.model.AgendaConfiguracao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AgendaConfiguracaoRepository extends JpaRepository<AgendaConfiguracao, Long> {
    @Query(value = "SELECT ag.id FROM AgendaConfiguracao ag where ag.id <> :id and ag.diaSemana = :diaSemana LIMIT 1", nativeQuery = true)
    Optional<AgendaConfiguracao> validarSave(@Param("id") Long id,@Param("diaSemana") Integer diaSemana);

    Optional<AgendaConfiguracao> findFirstByIdNotAndDiaSemana(Long id, Integer diaSemana);

}
