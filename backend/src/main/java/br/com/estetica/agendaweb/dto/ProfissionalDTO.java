package br.com.estetica.agendaweb.dto;

import br.com.estetica.agendaweb.dto.interfaces.Requisicao;
import br.com.estetica.agendaweb.dto.interfaces.Resposta;
import br.com.estetica.agendaweb.model.Ocupacao;
import br.com.estetica.agendaweb.model.Profissional;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record ProfissionalDTO(

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
        String cpf,

        @NotNull
        @JsonView({Requisicao.class, Resposta.class})
        Boolean desativado,

        @Pattern(regexp = "(^\\(\\d{2}\\)\\d{5}-\\d{4}$)")
        @JsonView({Requisicao.class, Resposta.class})
        String celular,

        @Pattern(regexp = "(^\\d{4}-\\d{4}$)")
        @JsonView({Requisicao.class, Resposta.class})
        String telefone,

        @JsonView({Requisicao.class, Resposta.class})
        String nomeSocial,

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

        @Size(min = 2, max = 2, message = "A UF deve ter somente 2 caracteres")
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

        @NotNull
        @JsonView({Requisicao.class, Resposta.class})
        Ocupacao ocupacao,

        @Size(min = 2, message = "O país deve ter pelo menos 2 caracteres")
        @NotBlank
        @JsonView({Requisicao.class, Resposta.class})
        String pais
) {
        public ProfissionalDTO(Profissional profissional){
                this(
                        profissional.getId(),
                        profissional.getNomeCompleto(),
                        profissional.getNascimento(),
                        profissional.getCpf(),
                        profissional.isDesativado(),
                        profissional.getCelular(),
                        profissional.getTelefone(),
                        profissional.getNomeSocial(),
                        profissional.getEndereco().getLogradouro(),
                        profissional.getEndereco().getNumero(),
                        profissional.getEndereco().getCep(),
                        profissional.getEndereco().getComplemento(),
                        profissional.getEndereco().getUf(),
                        profissional.getEndereco().getCidade(),
                        profissional.getEndereco().getBairro(),
                        profissional.getOcupacao(),
                        profissional.getEndereco().getPais()
                );
        }
}
