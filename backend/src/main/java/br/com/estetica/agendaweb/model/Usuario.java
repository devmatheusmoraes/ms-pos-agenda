package br.com.estetica.agendaweb.model;

import br.com.estetica.agendaweb.dto.UsuarioDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private int desativado;

    @OneToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.DETACH)
    private Set<Marcacao> marcacoes = new HashSet<>();

    public Usuario(UsuarioDTO dto){
        this.login = dto.login();
        this.senha = dto.senha();
        this.desativado = dto.desativado();
        //TODO MÉDICO
    }
}
