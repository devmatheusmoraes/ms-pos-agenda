package br.com.estetica.agendaweb.dto;

import br.com.estetica.agendaweb.dto.interfaces.Requisicao;
import br.com.estetica.agendaweb.dto.interfaces.Resposta;
import br.com.estetica.agendaweb.model.Cliente;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record ClienteDTO(

        @JsonView(Resposta.class)
        Long id,

        @Size(min = 5, message = "O nome completo deve ter pelo menos 5 caracteres")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String nomeCompleto,

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        @NotNull(message = "O nascimento deve estar no formato yyyy-MM-dd e não pode ser nulo")
        @JsonView({Requisicao.class, Resposta.class})
        LocalDate nascimento,

        @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "O CPF deve estar no formato xxx.xxx.xxx-xx")
        @JsonView({Requisicao.class, Resposta.class})
        @NotBlank String cpf,

        @NotNull
        @JsonView({Requisicao.class, Resposta.class})
        Boolean desativado,

        @JsonView({Requisicao.class, Resposta.class})
        String nomeSocial,

        @JsonView({Requisicao.class, Resposta.class})
        String indicacao,

        @JsonView({Requisicao.class, Resposta.class})
        String observacao,

        @JsonView({Requisicao.class, Resposta.class})
        String celular,

        @JsonView({Requisicao.class, Resposta.class})
        String telefone,

        @Size(min = 4, message = "O logradouro deve ter pelo menos 4 caracteres")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String logradouro,

        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String numero,

        @Pattern(regexp = "\\d{5}-\\d{3}", message = "O cep deve estar no formato xxxxx-xxx")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String cep,

        @JsonView({Requisicao.class, Resposta.class})
        String complemento,

        @Size(min = 2, max = 2, message = "A UF deve ter 2 caracteres")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String uf,

        @Size(min = 5, message = "A cidade deve ter pelo menos 5 caracteres")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String cidade,

        @Size(min = 5, message = "O bairro deve ter pelo menos 5 caracteres")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String bairro,

        @Size(min = 2, message = "O país deve ter pelo menos 2 caracteres")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String pais

) {

        public ClienteDTO (Cliente cliente){
                this(
                cliente.getId(),
                cliente.getNomeCompleto(),
                cliente.getNascimento(),
                cliente.getCpf(),
                cliente.isDesativado(),
                cliente.getNomeSocial(),
                cliente.getIndicacao(),
                cliente.getObservacao(),
                cliente.getCelular(),
                cliente.getTelefone(),
                cliente.getEndereco().getLogradouro(),
                cliente.getEndereco().getNumero(),
                cliente.getEndereco().getCep(),
                cliente.getEndereco().getComplemento(),
                cliente.getEndereco().getUf(),
                cliente.getEndereco().getCidade(),
                cliente.getEndereco().getBairro(),
                cliente.getEndereco().getPais()
                );
        }
}
