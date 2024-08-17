import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { handleOAuth } from "@/actions/OauthLogin"

const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button 
                variant="outline"
                className="w-full h-10 border-0 shadow-md"
                size="lg"
                onClick={() => {handleOAuth("google")}}
            >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button 
                variant="outline"
                className="w-full h-10 border-0 shadow-md"
                size="lg"
                onClick={() => {handleOAuth("github")}}
            >
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
    )
}

export default Social