package br.com.estetica.agendaweb.model;

import jakarta.persistence.*;
import lombok.*;


import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@EqualsAndHashCode(of = "id")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer duracao;

    @Column(nullable = false)
    private boolean desativado;

    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(
            name = "evento_procedimento",
            joinColumns = { @JoinColumn( name = "evento_id") },
            inverseJoinColumns = { @JoinColumn( name = "procedimento_id") }
    )
    private Set<Procedimento> procedimentos = new HashSet<>();

    @ManyToMany(mappedBy = "eventos")
    private Set<AgendaConfiguracao> agendaConfiguracoes = new HashSet<>();

}
