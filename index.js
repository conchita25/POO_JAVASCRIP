class Libro{
    constructor(id,titulo,autor,anio){
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.disponible = true;
    }
    apartar(){
        if(this.disponible){
            this.disponible = false;
            return true;
        }
        return false;
    }

    liberar(){
        this.disponible = true;
    }
}

class Usuario{
    constructor(nombre){
        this.nombre = nombre;
    }
}

class Apartados{
    constructor(usuario,libro){
        this.usuario = usuario;
        this.libro = libro;
        this.fecha = new Date();
    }

    mostrarInformacion(){
       return `
            <p>
                <strong>${this.libro.titulo}</strong>
                <br>
                usuario: ${this.usuario.nombre}
                <br>
                fecha: ${this.fecha.toLocaleDateString()}
            </p>
        `;
    }
}

class Biblioteca{
    constructor(){
        this.libros = [];
        this.apartados = [];
    }
    agregarLibro(libro){
        this.libros.push(libro);
    }
    buscarLibro(id){
        return this.libros.find(libro => libro.id === id);
    }
    apartarlibro(id,usuario){
        const libro = this.buscarLibro(id);
        if(!libro){
            alert("El libro no existe.");
            return;
        }
        if(!libro.disponible){
            alert("el libro ya esta apartado.");
            return;
        }

        libro.apartar();
        const apartado = new Apartados(usuario,libro);
        this.apartados.push(apartado);
        alert("Libro apartado con éxito.");

        mostrarlibros();
        mostrarApartados();
    }    
}  

const biblioteca = new Biblioteca();

biblioteca.agregarLibro(
    new Libro(
        1,
        "Viaje al centro de la tierra",
        "Julio Verne",
        1964
    )
);

biblioteca.agregarLibro(
    new Libro(
        2,
        "Harry Potter y la Piedra Filosofal",
        "J.K. Rowling",
        1997
    )
);

biblioteca.agregarLibro(
    new Libro(
        3,
        "Caperucita Roja",
        "Charles Perrault",
        1697
    )
);

biblioteca.agregarLibro(
    new Libro(
        4,
        "La Edad de la Razon",
        "Thomas Paine",
        1794
    )
);  

biblioteca.agregarLibro(
    new Libro(
        5,
        "La Herencia de la Sangre",
        "Claudio de Alas",
        1886
    )
);

biblioteca.agregarLibro(
    new Libro(
        6,
        "Otelo",
        "William Shakespeare",
        1603
    )
);

biblioteca.agregarLibro(
    new Libro(
        7,
        "La Maquina del Tiempo",
        "H.G. Wells",
        1895
    )
);  

biblioteca.agregarLibro(
    new Libro(
        8,
        "El Hada del Sauco",
        "Hans Christian Andersen",
        1844
    )
);  

biblioteca.agregarLibro(
    new Libro(
        9,
        "El Tuiseñor y la Rosa",
        "Oscar Wilde",
        1888
    )
);  

biblioteca.agregarLibro(
    new Libro(
        10,
        "El Perro y la Liebre",
        "Jean de La Fontaine",
        1697
    )
);  

biblioteca.agregarLibro(
    new Libro(
        11,
        "El Gato con Botas",
        "Charles Perrault",
        1697
    )
);  

biblioteca.agregarLibro(
    new Libro(
        12,
        "La Zorra, La Liebre y el Gallo",   
        "Aleksandr Nikolaevich Afanasiev",
        1863
    )
);

function registrarLibro(){
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anio = document.getElementById("anio").value;

    if (!titulo || !autor || !anio){
        alert("Por favor, complete todos los campos.");
        return;
    }

    const id = biblioteca.libros.length + 1;
    const libro = new Libro(id,titulo,autor,anio);

    biblioteca.agregarLibro(libro);
    alert("Libro registrado con éxito.");

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("anio").value = "";

    mostrarLibros();
}

function mostrarLibros(){
    const contenedor = document.getElementById("listaLibros");

    contenedor.innerHTML = "";

    biblioteca.libros.forEach(libro => {

        const div= document.createElement("div");
        div.className = "libro";
        div.innerHTML = `
            <h3>${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Anio:</strong> ${libro.anio}</p>

             <p class="${libro.disponible ? 'disponible' : 'apartado'}">
        ${libro.disponible ? 'Disponible' : 'Apartado'}
        </p>

        ${libro.disponible ? `<button onclick="apartar(${libro.id})">Apartar libro</button>` : ''}
        `;
        
        contenedor.appendChild(div);
    });
}

function apartar(id){
    const nombre = document.getElementById("usuario").value;
    if(!nombre){
        alert("Escriba el nombre del usuario.");
        return;
    }

    const usuario = new Usuario(nombre);
    biblioteca.apartarlibro(id, usuario);
}

function mostrarApartados(){
    const contenedor = document.getElementById("listaApartados");
    contenedor.innerHTML = "";
    if(biblioteca.apartados.length === 0){
        contenedor.innerHTML = "<p>No existen libros apartados.</p>";
        return;
    }

    biblioteca.apartados.forEach(apartado => {
        const div = document.createElement("div");
        div.className = "libro";
        div.innerHTML = apartado.mostrarInformacion();
        contenedor.appendChild(div);
    });
}

mostrarLibros();
