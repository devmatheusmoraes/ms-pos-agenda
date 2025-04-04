package br.com.estetica.agendaweb.dto;

import br.com.estetica.agendaweb.dto.interfaces.Requisicao;
import br.com.estetica.agendaweb.dto.interfaces.Resposta;
import br.com.estetica.agendaweb.model.AgendaConfiguracao;
import br.com.estetica.agendaweb.model.Evento;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import java.util.stream.Collectors;

public record AgendaConfiguracaoDTO(

        @JsonView(Resposta.class)
        Long id,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
        @Schema(type = "string", example = "08:00")
        @JsonView({Requisicao.class, Resposta.class})
        LocalTime horaInicio,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
        @Schema(type = "string", example = "18:00")
        @JsonView({Requisicao.class, Resposta.class})
        LocalTime horaFim,

        @FutureOrPresent(message = "A data da vigência deve ser presente ou Futuro - Formato [yyyy-MM-dd]")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        @JsonView({Requisicao.class, Resposta.class})
        LocalDate dataInicio,

        @Min(1)
        @Max(7)
        @JsonView({Requisicao.class, Resposta.class})
        Integer diaSemana,

        @NotEmpty
        @JsonView({Requisicao.class, Resposta.class})
        Set<Long> eventoId,

        @NotNull(message = "O ID do profissional deve ser especificado.")
        @Positive(message = "Deve ser passado um ID válido do profissional.")
        @JsonView({Requisicao.class, Resposta.class})
        Long profissionalId

) {

        public AgendaConfiguracaoDTO(AgendaConfiguracao agendaConfiguracao){
                this(
                        agendaConfiguracao.getId(),
                        agendaConfiguracao.getHoraInicio(),
                        agendaConfiguracao.getHoraFim(),
                        agendaConfiguracao.getDataInicio(),
                        agendaConfiguracao.getDiaSemana(),
                        agendaConfiguracao.getEventos().stream().map(Evento::getId).collect(Collectors.toSet()),
                        agendaConfiguracao.getProfissional().getId());
        }
}
