package br.com.estetica.agendaweb.model;

import br.com.estetica.agendaweb.dto.ProfissionalDTO;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Profissional extends Pessoa{

    private Ocupacao ocupacao;

    public Profissional(ProfissionalDTO dto){
        super(dto.nomeCompleto(), dto.nascimento(), dto.cpf(),dto.desativado(), dto.celular(), dto.telefone(), dto.nomeSocial(),
                dto.logradouro(), dto.numero(), dto.cep(), dto.complemento(), dto.uf(), dto.cidade(), dto.bairro(), dto.pais());
        this.ocupacao = dto.ocupacao();
    }

}
