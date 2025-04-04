import styles from "./formularioprofissional.module.css";
import {useForm} from "react-hook-form";
import api from "../../../../api/axiosInstance";
import InputMask from "react-input-mask";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";

const createProfissionalFormSchema = z.object({
    nomeCompleto: z.string().min(1, "Campo Obrigatório"),
    nascimento: z.string().min(1, "Campo Obrigatório"),
    cpf: z.string().min(1, "Campo Obrigatório"),
    desativado: z.boolean().optional(),
    celular: z.string().min(1, "Campo Obrigatório"),
    telefone: z.string().min(1, "Campo Obrigatório"),
    nomeSocial: z.string().optional(),
    logradouro: z
        .string()
        .min(4, "O logradouro precisa ter no mínimo 4 caracteres"),
    numero: z.string().optional(),
    cep: z.string().min(1, "Campo Obrigatório"),
    complemento: z.string().optional(),
    uf: z
        .string()
        .min(2, "O UF contém apenas 2 caracteres")
        .max(2, "O UF contém apenas 2 caracteres"),
    cidade: z.string().min(5, "A cidade precisa ter no mínimo 5 caracteres"),
    bairro: z.string().min(5, "O bairro precisa ter no mínimo 5 caracteres"),
    ocupacao: z.string().min(2, "A ocupação precisa ter no mínimo 2 caracteres"),
    pais: z.string().min(2, "O país precisa ter no mínimo 2 caracteres"),
});

export default function FormularioProfissional() {
    const {
        register, handleSubmit, formState: {errors}, control,
    } = useForm({
        resolver: zodResolver(createProfissionalFormSchema), defaultValues: {
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
        };

        api
            .post("/professional/save", formattedData)
            .then((response) => {
                alert("Profissional salvo com sucesso!");
                navigate("/profissionais");
            })
            .catch((error) => {
                console.error("Erro ao salvar os dados:", error);
                alert("Erro ao cadastrar Profissional");
            });
    };

    return (<form className={styles.formContainerProfessional} onSubmit={handleSubmit(onSubmit)}>
        <div>
            <div>
                <h1>Cadastro de Profissional</h1>
            </div>

            <label>Nome Completo</label>
            <input type="text" {...register("nomeCompleto")} />
            {errors.nomeCompleto && (<p className={styles.error}>{errors.nomeCompleto.message}</p>)}

            <label>Nascimento</label>
            <input type="date" {...register("nascimento")} />
            {errors.nascimento && (<p className={styles.error}>{errors.nascimento.message}</p>)}

            <label>CPF</label>
            <InputMask mask="999.999.999-99" {...register("cpf")}>
                {(inputProps) => <input type="text" {...inputProps} />}
            </InputMask>
            {errors.cpf && <p className={styles.error}>{errors.cpf.message}</p>}

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

            <label>Nome Social</label>
            <input type="text" {...register("nomeSocial")} />

            <label>Ocupação</label>
            <input type="text" {...register("ocupacao")} />
            {errors.ocupacao && <p className={styles.error}>{errors.ocupacao.message}</p>}
            <label>Desativado</label>
            <input type="checkbox" {...register("desativado")} />
        </div>

        <div className="endereco-container">
            <label>Cep</label>
            <InputMask mask="99999-999" {...register("cep")}>
                {(inputProps) => <input type="text" {...inputProps} />}
            </InputMask>
            {errors.cep && <p className={styles.error}>{errors.cep.message}</p>}

            <label>Logradouro</label>
            <input type="text" {...register("logradouro")} />
            {errors.logradouro && <p className={styles.error}>Campo Obrigatório</p>}

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
    </form>);
}
