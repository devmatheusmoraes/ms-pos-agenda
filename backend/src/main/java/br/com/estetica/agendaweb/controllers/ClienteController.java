package br.com.estetica.agendaweb.controllers;

import br.com.estetica.agendaweb.dto.ClienteDTO;
import br.com.estetica.agendaweb.model.Cliente;
import br.com.estetica.agendaweb.model.Endereco;
import br.com.estetica.agendaweb.services.ClienteService;
import br.com.estetica.agendaweb.services.EnderecoService;
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
@Tag(name = "Cliente", description = " - Operações relacionadas aos clientes")
@RequestMapping("/customer")
public class ClienteController {
    
    private final ClienteService clienteService;
    
    private final EnderecoService enderecoService;

    @Operation(summary = "Adicionar Novo Cliente")
    @PostMapping("/save")
    public ResponseEntity<String> save(@Valid @RequestBody ClienteDTO dto){
        Cliente cliente = new Cliente(dto);
        enderecoService.save(cliente.getEndereco());
        clienteService.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente criado com sucesso.");
    }

    @Operation(summary = "Listar Todos os Clientes")
    @GetMapping("/getAll")
    public ResponseEntity<List<ClienteDTO>> getAll(){
        List<Cliente> clientes = clienteService.findAll();
        return ResponseEntity.ok().body(clientes.stream().map(ClienteDTO::new).collect(Collectors.toList()));

    }

    @Operation(summary = "Buscar por um Cliente")
    @GetMapping("/getById/{id}")
    public ResponseEntity<ClienteDTO> getById(@PathVariable Long id){
        Optional<Cliente> optionalCliente = clienteService.findById(id);
        return optionalCliente.map(cliente -> ResponseEntity.ok().body(new ClienteDTO(cliente)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }

    @Operation(summary = "Atualizar Cliente")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @Valid @RequestBody ClienteDTO dto){
        Cliente cliente = new Cliente(dto);
        Endereco endereco = clienteService.findById(id).orElseThrow().getEndereco();
        cliente.getEndereco().setId(endereco.getId());
        enderecoService.update(endereco.getId(), cliente.getEndereco());
        clienteService.update(id, cliente);
        return ResponseEntity.ok().body("Cliente atualizado com sucesso");
    }

    @Operation(summary = "Excluir Cliente")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        clienteService.deleteById(id);
        return ResponseEntity.ok().body("Cliente excluído com sucesso");
    }

}
