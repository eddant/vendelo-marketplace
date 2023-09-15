import carIcon from './assets/car-svgrepo-com.svg'
import couchIcon from './assets/couch-svgrepo-com.svg'
import laptopIcon from './assets/laptop-svgrepo-com.svg'
import phoneIcon from './assets/phone-svgrepo-com.svg'
import houseIcon from './assets/house-2-svgrepo-com.svg'
import suitCaseIcon from './assets/suitcase-portfolio-svgrepo-com.svg'
import tedyBear from './assets/teddy-bear-svgrepo-com.svg'
//import tv from './assets/tv-svgrepo-com.svg'

export const categorias = [
    {
        categoria: 'Autos',
        icono: carIcon,
        subCategoria: [
            {
                categoria: 'Camionetas',
            },
            {
                categoria: 'Deportivos',
            },
            {
                categoria: 'Jeepetas'
            }
        ]
    },
    {
        categoria: 'Hogar',
        icono: couchIcon,
        subCategoria: [
            {
                categoria: 'Cocina'
            },
            {
                categoria: 'Muebles',
            },
            {
                categoria: 'Televisores',
            },
        ]
    },
    {
        categoria: 'Smartphones',
        icono: phoneIcon,
    },
    {
        categoria: 'Inmuebles',
        icono: houseIcon,
        subCategoria: [
            {
                categoria: 'Apartamentos'
            },
            {
                categoria: 'Casas'
            },
            {
                categoria: 'Habitaciones'
            },
            {
                categoria: 'Villas'
            }

        ]
    },
    {
        categoria: 'Computadoras',
        icono: laptopIcon,
        subCategoria: [
            {
                categoria: 'Laptops',
            },
            {
                categoria: 'CPUs',
            },
            {
                categoria: 'Tablets'
            }
        ]

    },
    {
        categoria: 'Ninos',
        icono: tedyBear
    },
    {
        categoria: 'Empleo',
        icono: suitCaseIcon
    }
]