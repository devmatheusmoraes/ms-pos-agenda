package br.com.estetica.agendaweb.dto;

import br.com.estetica.agendaweb.dto.interfaces.Requisicao;
import br.com.estetica.agendaweb.dto.interfaces.Resposta;
import br.com.estetica.agendaweb.model.Procedimento;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProcedimentoDTO(

        @JsonView(Resposta.class)
        Long id,

        @NotBlank
        @Size(min = 3, message = "O nome deve ter pelo menos são 3 caracteres.")
        @JsonView({Requisicao.class, Resposta.class})
        String nome,

        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        boolean desativado) {

        public ProcedimentoDTO(Procedimento procedimento){
                this(
                        procedimento.getId(),
                        procedimento.getNome(),
                        false);
        }
}
