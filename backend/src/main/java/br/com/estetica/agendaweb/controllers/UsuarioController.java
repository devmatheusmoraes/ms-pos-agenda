package br.com.estetica.agendaweb.controllers;

import br.com.estetica.agendaweb.dto.UsuarioDTO;
import br.com.estetica.agendaweb.model.Usuario;
import br.com.estetica.agendaweb.services.ProfissionalService;
import br.com.estetica.agendaweb.services.impl.UsuarioServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Tag(name = "Usuário", description = " - Operações relacionadas aos usuários")
@RequestMapping("/user")
public class UsuarioController {

    private final UsuarioServiceImpl usuarioService;

    private final ProfissionalService profissionalService;

    @Operation(summary = "Adicionar um Novo Usuário")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody UsuarioDTO dto){
        Usuario usuario = new Usuario(dto);
        profissionalService.findById(dto.idProfissional()).ifPresent(usuario::setProfissional);
        usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso");
    }

    @Operation(summary = "Listar Todos os Usuários")
    @GetMapping("/getAll")
    public ResponseEntity<List<UsuarioDTO>> getAll(){
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok().body(usuarios.stream().map(UsuarioDTO::new).collect(Collectors.toList()));
    }

    @Operation(summary = "Buscar por um Usuário")
    @GetMapping("/getById/{id}")
    public ResponseEntity<UsuarioDTO> getById(@PathVariable Long id){
        Optional<Usuario> optionalUsuario = usuarioService.findById(id);
        return optionalUsuario.map(usuario -> ResponseEntity.ok().body(new UsuarioDTO(usuario)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Atualizar Usuário")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody UsuarioDTO dto) {
        Usuario usuario = new Usuario(dto);
        usuarioService.update(id, usuario);
        return ResponseEntity.ok().body("Usuário atualizado com sucesso");
    }

    @Operation(summary = "Excluir Usuário")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        usuarioService.deleteById(id);
        return ResponseEntity.ok().body("Usuário excluído com sucesso");
    }

}
