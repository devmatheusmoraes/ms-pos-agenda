package br.com.estetica.agendaweb.dto;

import br.com.estetica.agendaweb.dto.interfaces.Requisicao;
import br.com.estetica.agendaweb.dto.interfaces.Resposta;
import br.com.estetica.agendaweb.model.Marcacao;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record MarcacaoDTO(

        @JsonView({Resposta.class})
        Long id,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
        @FutureOrPresent(message = "A data da marcação deve ser presente ou Futuro - Formato [yyyy-MM-dd HH:mm]")
        @Schema(type = "string", example = "2025-01-01 12:00")
        @JsonView({Requisicao.class, Resposta.class})
        LocalDateTime dataMarcada,

        String observacao,

        @NotNull(message = "O ID do Cliente é obrigatório")
        @JsonView({Requisicao.class, Resposta.class})
        Long clienteId,

        @NotNull(message = "O ID do Profissional é obrigatório")
        @JsonView({Requisicao.class, Resposta.class})
        Long profissionalId,

        @NotNull(message = "O ID da Configuração de Agenda é obrigatório")
        @JsonView({Requisicao.class, Resposta.class})
        Long agendaConfiguracaoId,

        @NotNull(message = "O ID do Usuário é obrigatório")
        @JsonView({Requisicao.class, Resposta.class})
        Long usuarioId

) {

    public MarcacaoDTO(Marcacao marcacao){
        this(marcacao.getId(),
                marcacao.getDataMarcada(),
                marcacao.getObservacao(),
                marcacao.getCliente().getId(),
                marcacao.getProfissional().getId(),
                marcacao.getAgendaConfiguracao().getId(),
                marcacao.getUsuario().getId());
    }

}
