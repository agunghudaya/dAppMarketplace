import detectEthereumProvider from "@metamask/detect-provider"
import Web3 from "web3"

const { createContext, useContext, useEffect, useState, useMemo } =  require("react")
const Web3Context = createContext  (null)

export default function Web3Provider({children}) {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isInitialized: false
    })

    useEffect(() => {
        const loadProvider  = async () => {
            const provider  = await detectEthereumProvider()
            if (provider){
                const web3 = new Web3(provider)
                setWeb3Api({
                    provider, 
                    web3, 
                    contract: null, 
                    isInitialized: true})
            } else {
                setWeb3Api(api => ({ ...api, isInitialized: true}))
                console.error("please install metamask")
            }
        }

        loadProvider()
    }, [])

    const _web3Api = useMemo(() => {
        return {
          ...web3Api,
          isWeb3Loaded: web3Api.web3 != null,
          connect: web3Api.provider ?
            async () => {
              try {
                await web3Api.provider.request({method: "eth_requestAccounts"})
              } catch {
                location.reload()
              }
            } :
            () => console.error("Cannot connect to Metamask, try to reload your browser please.")
        }
      }, [web3Api])

    return (
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context)
}
