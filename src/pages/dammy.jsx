import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { client } from "../lib/sanity"
import ReactPlayer from 'react-player'
import { PortableText } from '@portabletext/react'

const MoviesDetais = () => {
    const { id } = useParams()
    const [movieData, setMovieData] = useState({})
    console.log("🚀 ~ file: MoviesDetais.jsx:8 ~ MoviesDetais ~ movieData:", movieData)

    const specificMovieDetails = async (selectedId) => {
        const query = `*[_type == "movies" && _id=="${selectedId}"]{name, _id, cast, category, trailerUrl, category->{name},"imageLink": poster.asset->url,desc}`
        const movieDetails = await client.fetch(query)
        setMovieData(movieDetails[0])
    }

    useEffect(() => {

        specificMovieDetails(id)

    }, [])


    return (
        <section>
            <div className="container mx-auto">
                <div className="flex gap-4 justify-center">
                    <div>
                        <img className="avatar w-96" src={movieData.imageLink} alt="" />
                    </div>
                    <div>
                        <div>
                            <h1 className="text-4xl">{movieData.name} <span className="badge badge-warning">{movieData.category?.name}</span></h1>
                            <PortableText
                                value={movieData.desc}

                            />
                            <div className="mt-7  flex flex-col justify-center">
                                <div>
                                    <ul className="my-3 mx-4">
                                        {
                                            movieData.cast?.map((c, i) => <li className="badge badge-neutral mx-2 " key={i}>{c}</li>)
                                        }
                                    </ul>
                                </div>
                                <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_4').showModal()}>Trailer</button>
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <dialog id="my_modal_4" className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl">
                                        <div className="flex justify-center">
                                            <ReactPlayer width={840} url={movieData.trailerUrl} />
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MoviesDetais