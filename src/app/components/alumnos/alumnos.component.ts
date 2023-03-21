import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  constructor(private service: AlumnoService) { }

  alumnos: Alumno[];
  titulo = "Alumnos";

  ngOnInit(): void {
    this.service.obtenerTodo().subscribe(alumnos => {
      this.alumnos = alumnos;
    });
  }

}
