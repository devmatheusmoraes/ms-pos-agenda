package br.com.estetica.agendaweb.model;

import br.com.estetica.agendaweb.dto.AgendaConfiguracaoDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(of = "id")
@Entity
public class AgendaConfiguracao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalTime horaInicio;

    @Column(nullable = false)
    private LocalTime horaFim;

    @Column(nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private Integer diaSemana;

    @ManyToOne
    @JoinColumn(name = "profissional_id", nullable = false)
    private Profissional profissional;

    @ManyToMany
    @JoinTable(
            name = "evento_agendaConfiguracao",
            joinColumns = { @JoinColumn( name = "agendaConfiguracao_id") },
            inverseJoinColumns = { @JoinColumn( name = "evento_id" )}
    )
    private Set<Evento> eventos = new HashSet<>();

    @OneToMany(mappedBy = "agendaConfiguracao", cascade = CascadeType.DETACH)
    private Set<Marcacao> marcacoes= new HashSet<>();

    public AgendaConfiguracao(AgendaConfiguracaoDTO dto) {
        this.horaInicio = dto.horaInicio();
        this.horaFim = dto.horaFim();
        this.dataInicio = dto.dataInicio();
        this.diaSemana = dto.diaSemana();
    }
}
