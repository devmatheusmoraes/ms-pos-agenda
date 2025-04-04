package br.com.estetica.agendaweb.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pessoa_sequence")
    @SequenceGenerator(name = "pessoa_sequence", sequenceName = "pessoa_sequence", allocationSize = 1)
    private Long id;

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false)
    private LocalDate nascimento;

    @Column(nullable = false)
    private String cpf;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;

    @Column(nullable = false)
    private boolean desativado;

    private String celular;

    private String telefone;

    @Column(nullable = false)
    private String nomeSocial;

    public Pessoa(String nomeCompleto, LocalDate nascimento, String cpf, Boolean desativado, String celular, String telefone,
                  String nomeSocial, String logradouro, String numero, String cep, String complemento, String uf,
                  String cidade, String bairro, String pais){
        this.nomeCompleto = nomeCompleto;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.desativado = desativado;
        this.celular = celular;
        this.telefone = telefone;
        this.nomeSocial = nomeSocial;
        this.endereco = new Endereco();
        this.endereco.setLogradouro(logradouro);
        this.endereco.setNumero(numero);
        this.endereco.setCep(cep);
        this.endereco.setComplemento(complemento);
        this.endereco.setUf(uf);
        this.endereco.setCidade(cidade);
        this.endereco.setBairro(bairro);
        this.endereco.setPais(pais);
    }

}
