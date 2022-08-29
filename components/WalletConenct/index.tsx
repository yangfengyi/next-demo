import { hooks, metaMask } from '../../connectors/metaMask'
import { useEffect } from 'react'
import { useCallback, useState } from 'react'

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function WalletConenct() {

  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [error, setError] = useState(undefined)

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  console.log(chainId, accounts, isActivating, isActive, provider, ENSNames, error)

  const handleConenctClick = useCallback(() => {
    setError(undefined)
    if (metaMask) {
      metaMask
        .activate()
        .then(() => setError(undefined))
        .catch(setError)
    }
  }, [])

  console.log(chainId, accounts, isActivating, isActive, error)

  return (
    <div>
      <button
        className="px-[24px] py-[8px] bg-blue-700 rounded-full text-white"
        onClick={handleConenctClick}
      >
        Wallent Conenct
      </button>
    </div>
  )
}