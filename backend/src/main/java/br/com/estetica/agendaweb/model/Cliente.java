package br.com.estetica.agendaweb.model;

import br.com.estetica.agendaweb.dto.ClienteDTO;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Cliente extends Pessoa {

    private String indicacao;

    private String observacao;

    public Cliente(ClienteDTO dto){
        super(dto.nomeCompleto(), dto.nascimento(), dto.cpf(), dto.desativado(), dto.celular(), dto.telefone(), dto.nomeSocial(),
                dto.logradouro(), dto.numero(), dto.cep(), dto.complemento(), dto.uf(), dto.cidade(), dto.bairro(), dto.pais());
        this.indicacao = dto.indicacao();
        this.observacao = dto.observacao();
    }
}
