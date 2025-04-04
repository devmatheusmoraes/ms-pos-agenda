package br.com.estetica.agendaweb.model;


import br.com.estetica.agendaweb.dto.ProcedimentoDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Procedimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private boolean desativado;

    @JsonIgnore
    @ManyToMany(mappedBy = "procedimentos")
    private Set<Evento> eventos = new HashSet<>();

    public Procedimento(ProcedimentoDTO dto){
        this.nome = dto.nome();
        this.desativado = dto.desativado();
    }

}
