package br.com.estetica.agendaweb.controllers;

import br.com.estetica.agendaweb.dto.ProfissionalDTO;
import br.com.estetica.agendaweb.model.Endereco;
import br.com.estetica.agendaweb.model.Profissional;
import br.com.estetica.agendaweb.services.EnderecoService;
import br.com.estetica.agendaweb.services.ProfissionalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Tag(name = "Profissional", description = " - Operações relacionadas aos Profissionais")
@RequestMapping("/professional")
public class ProfissionalController {

    private final ProfissionalService profissionalService;

    private final EnderecoService enderecoService;

    @Operation(summary = "Adicionar um Novo Profissional")
    @PostMapping("/save")
    public ResponseEntity<String> save(@Valid @RequestBody ProfissionalDTO dto){
        Profissional profissional = new Profissional(dto);
        enderecoService.save(profissional.getEndereco());
        profissionalService.save(profissional);
        return ResponseEntity.status(HttpStatus.CREATED).body("Profissional salvo com sucesso!");
    }

    @Operation(summary = "Listar Todos os Profissionals")
    @GetMapping("/getAll")
    public ResponseEntity<List<ProfissionalDTO>> getAll(){
        List<Profissional> profissionals = profissionalService.findAll();
        return ResponseEntity.ok().body(profissionals.stream().map(ProfissionalDTO::new).collect(Collectors.toList()));
    }

    @Operation(summary = "Buscar por um Profissional")
    @GetMapping("/getById/{id}")
    public ResponseEntity<ProfissionalDTO> getBydId(@PathVariable Long id){
        Optional<Profissional> profissionalOptional = profissionalService.findById(id);
        return profissionalOptional.map(profissional -> ResponseEntity.ok().body(new ProfissionalDTO(profissional)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Atualizar Profissional")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @Valid @RequestBody ProfissionalDTO dto){
        Profissional profissional = new Profissional(dto);
        Endereco endereco = profissionalService.findById(id).orElseThrow().getEndereco();
        profissional.getEndereco().setId(endereco.getId());
        enderecoService.update(endereco.getId(), profissional.getEndereco());
        profissionalService.update(id, profissional);
        return ResponseEntity.ok().body("Profissional atualizado com sucesso");
    }

    @Operation(summary = "Excluir Profissional")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        profissionalService.delete(id);
        return ResponseEntity.ok().body("Profissional excluído com sucesso");
    }

}
