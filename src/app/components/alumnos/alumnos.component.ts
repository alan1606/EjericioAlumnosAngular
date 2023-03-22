import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit {
  constructor(private service: AlumnoService) {}

  alumnos: Alumno[];
  titulo = 'Alumnos';

  ngOnInit(): void {
    this.service.obtenerTodo().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
  }

  public eliminar(alumno: Alumno): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar a ${alumno.nombres}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(alumno.id).subscribe(() => {
          this.alumnos = this.alumnos.filter((a) => a !== alumno);
        });
        Swal.fire(
          'Eliminado',
          `Alumno ${alumno.nombres} eliminado con éxito`,
          'success'
        );
      }
    });


  }
}
