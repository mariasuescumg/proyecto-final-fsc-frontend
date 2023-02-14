import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FaUserCircle, FaLock } from "react-icons/fa";


export default function Login() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async data => {
    console.log(data)
        // const {email, password} = data
        try {
          const res = await fetch("http://localhost:5000/api/login",{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        if(res.status === 200){
            const json = await res.json()
            Cookies.set("token", json.token)
			router.push("/dashboard")
        }else{
          const json = await res.json()
          console.log(json)
        }
        
        } catch (error) {
          console.log(error)
        }
        
      }
		


	return (
		<div className="container">
			<Image src="/img/logo.png" alt="logo" width={150} height={150} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="login-input">
					<FaUserCircle size={20}/>
					<input
						type="text"
						autoComplete="off"
						name="email"
						placeholder="ejemplo@gmail.com"
						{...register("email", {
							required: {
								value: true,
								message: "El campo es requerido",
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "El formato no e{errors.email && <span>{errors.email.message}</span>}s correcto",
							},
						})}
					/>

					
				</div>

				<div className="login-input">
					<FaLock size={20}/>

					<input
						type="password"
						name="password"
						placeholder="Contraseña"
						{...register("password", {
							required: {
								value: true,
								message: "El campo es requerido",
							},
							/* pattern: {
								value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
								message: "La contraseña debe tener al menos 8 caracteres, ser alfanumerica letras mayusculas minusculas y numeros",
							}, */
						})}
					/>
					{errors.password && <span>{errors.password.message}</span>}
				</div>

				<button className="btn submit">Ingresar</button>
			</form>
		</div>
	);
}
