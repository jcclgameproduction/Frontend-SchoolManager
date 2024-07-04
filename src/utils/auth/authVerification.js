import config from "../../config";

export const verifyAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false;
    } else {
        try {
            const response = await fetch(`${config.apiUrl}/login/testauth2`, {
                method: 'GET',
                headers: {
                    'authorization': `${token}`,
                },
            });
            
            console.log(response.status);
            
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}