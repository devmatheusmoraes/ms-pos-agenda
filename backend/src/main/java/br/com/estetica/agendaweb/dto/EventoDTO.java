package br.com.estetica.agendaweb.dto;

import br.com.estetica.agendaweb.dto.interfaces.Requisicao;
import br.com.estetica.agendaweb.dto.interfaces.Resposta;
import br.com.estetica.agendaweb.model.Evento;
import br.com.estetica.agendaweb.model.Procedimento;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.*;


import java.util.Set;
import java.util.stream.Collectors;

public record EventoDTO(

        @JsonView(Resposta.class)
        Long id,

        @NotBlank
        @Size(min = 5, message = "O nome do evento deve ter pelo menos 5 caracteres")
        @JsonView({Requisicao.class, Resposta.class})
        String nome,

        @NotNull(message = "A duração deve ser especificada.")
        @Min(value = 1, message = "A duração deve ser pelo menos 1 minuto.")
        @JsonView({Requisicao.class, Resposta.class})
        Integer duracaoEmMinuto,

        @NotNull
        @JsonView({Requisicao.class, Resposta.class})
        boolean desativado,

        @NotNull(message = "O ID do procedimento deve ser especificado.")
        Set<Long> idProdecedimento

) {
        public EventoDTO (Evento evento){
                this(
                        evento.getId(),
                        evento.getNome(),
                        evento.getDuracao(),
                        evento.isDesativado(),
                        evento.getProcedimentos().stream().map(Procedimento::getId).collect(Collectors.toSet())
                );
        }
}
