import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity()
export class VacunaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

/*    @ManyToOne(
        type => LibroEntity,
        libro=>libro.vacunas
    )
    libro: LibroEntity;*/
}























