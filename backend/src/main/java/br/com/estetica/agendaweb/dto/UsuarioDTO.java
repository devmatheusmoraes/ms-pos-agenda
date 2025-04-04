package br.com.estetica.agendaweb.dto;

import br.com.estetica.agendaweb.dto.interfaces.Requisicao;
import br.com.estetica.agendaweb.dto.interfaces.Resposta;
import br.com.estetica.agendaweb.model.Usuario;
import com.fasterxml.jackson.annotation.JsonView;

public record UsuarioDTO(

        @JsonView(Resposta.class)
        Long id,

        @JsonView({Requisicao.class, Resposta.class})
        String login,

        @JsonView({Requisicao.class, Resposta.class})
        String senha,

        @JsonView({Requisicao.class, Resposta.class})
        int desativado,

        @JsonView({Requisicao.class, Resposta.class})
        Long idProfissional) {

    public UsuarioDTO(Usuario usuario){
        this(
                usuario.getId(),
                usuario.getLogin(),
                usuario.getSenha(),
                usuario.getDesativado(),
                usuario.getId()
        );
    }
}
