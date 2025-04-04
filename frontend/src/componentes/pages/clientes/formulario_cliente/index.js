import { useForm } from "react-hook-form";
import axios from "axios";
import InputMask from "react-input-mask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import styles from "./formulariocliente.module.css";

const createClienteFormSchema = z.object({
  nomeCompleto: z.string().min(1, "Campo Obrigatório"),
  nascimento: z.string().min(1, "Campo Obrigatório"),
  cpf: z.string().min(1, "Campo Obrigatório"),
  desativado: z.boolean(),
  nomeSocial: z.string().optional(),
  indicacao: z.string().optional(),
  observacao: z.string().optional(),
  celular: z.string().min(1, "Campo Obrigatório"),
  telefone: z.string().min(1, "Campo Obrigatório"),
  logradouro: z.string().min(4, "O logradouro precisa ter no mínimo 4 caracteres"),
  numero: z.string(),
  cep: z.string().min(1, "Campo Obrigatório"),
  complemento: z.string(),
  uf: z.string().min(2, "O UF contém apenas 2 caracteres").max(2, "O UF contém apenas 2 caracteres"),
  cidade: z.string().min(5, "A cidade precisa ter no mínimo 5 caracteres"),
  bairro: z.string().min(5, "O bairro precisa ter no mínimo 5 caracteres"),
  pais: z.string().min(2, "O país precisa ter no mínimo 2 caracteres"),
});

export default function FormularioCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createClienteFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post("http://localhost:8080/customer/save", data);
      alert("Cliente salvo com sucesso!");
      navigate("/cliente");
    } catch (error) {
      console.error("Error:", error);
      alert("Não foi possível salvar o cliente.", error);
    }
  };

  return (
      <form className={styles.formContainerCliente} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Cadastro de Cliente</h1>
          <label>Nome Completo</label>
          <input type="text" {...register("nomeCompleto")} />
          {errors.nomeCompleto && <p className={styles.error}>{errors.nomeCompleto.message}</p>}

          <label>Nascimento</label>
          <input type="date" {...register("nascimento")} />
          {errors.nascimento && <p className={styles.error}>{errors.nascimento.message}</p>}

          <label>CPF</label>
          <InputMask mask="999.999.999-99" {...register("cpf")}>
            {(inputProps) => <input type="text" {...inputProps} />}
          </InputMask>
          {errors.cpf && <p className={styles.error}>{errors.cpf.message}</p>}

          <label>Nome Social</label>
          <input type="text" {...register("nomeSocial")} />

          <label>Indicação</label>
          <input type="text" {...register("indicacao")} />

          <label>Observação</label>
          <input type="text" {...register("observacao")} />

          <label>Celular</label>
          <InputMask mask="(99)99999-9999" {...register("celular")}>
            {(inputProps) => <input type="text" {...inputProps} />}
          </InputMask>
          {errors.celular && <p className={styles.error}>{errors.celular.message}</p>}

          <label>Telefone</label>
          <InputMask mask="9999-9999" {...register("telefone")}>
            {(inputProps) => <input type="text" {...inputProps} />}
          </InputMask>
          {errors.telefone && <p className={styles.error}>{errors.telefone.message}</p>}

          <label>Desativado</label>
          <input type="checkbox" {...register("desativado")} />
        </div>


        <div className={styles.enderecoContainer}>
          <label>Cep</label>
          <InputMask mask="99999-999" {...register("cep")}>
            {(inputProps) => <input type="text" {...inputProps} />}
          </InputMask>
          {errors.cep && <p className={styles.error}>{errors.cep.message}</p>}

          <label>Logradouro</label>
          <input type="text" {...register("logradouro")} />
          {errors.logradouro && <p className={styles.error}>{errors.logradouro.message}</p>}

          <label>Número</label>
          <input type="number" {...register("numero")} />
          {errors.numero && <p className={styles.error}>{errors.numero.message}</p>}

          <label>Complemento</label>
          <input type="text" {...register("complemento")} />

          <label>UF</label>
          <input type="text" {...register("uf")} />
          {errors.uf && <p className={styles.error}>{errors.uf.message}</p>}

          <label>Cidade</label>
          <input type="text" {...register("cidade")} />
          {errors.cidade && <p className={styles.error}>{errors.cidade.message}</p>}

          <label>Bairro</label>
          <input type="text" {...register("bairro")} />
          {errors.bairro && <p className={styles.error}>{errors.bairro.message}</p>}

          <label>País</label>
          <input type="text" {...register("pais")} />
          {errors.pais && <p className={styles.error}>{errors.pais.message}</p>}


          <button className={styles.button} type="submit">
            Enviar
          </button>
        </div>
      </form>
  );
}
