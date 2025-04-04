package br.com.estetica.agendaweb.model;

import br.com.estetica.agendaweb.dto.MarcacaoDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(of = "id")
@Entity
public class Marcacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime dataMarcada;

    @Column(nullable = false)
    private String observacao;

    @Column(nullable = false)
    private int desativado;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "profissional_id", nullable = false)
    private Profissional profissional;

    @ManyToOne
    @JoinColumn(name = "agendaConfiguracao_id", nullable = false)
    private AgendaConfiguracao agendaConfiguracao;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public Marcacao(MarcacaoDTO dto) {
        this.dataMarcada = dto.dataMarcada();
        this.observacao = dto.observacao();
    }

}
