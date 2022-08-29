import { hooks, metaMask } from '../../connectors/metaMask'
const { useChainId, useAccounts, useIsActivating, useIsActive } = hooks

export default function MetaMaskMessage() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()

  if (isActivating) {
    return (
      <div>
        loading...
      </div>
    )
  }

  if (!isActive) {
    return <></>
  }

  return (
    <div>
      <ul>
        <li>{chainId}</li>
        <li>
          {accounts?.map((ele) => {
            return (
              <span key={ele}>
                {ele}
              </span>
            )
          })}
        </li>
      </ul>

      {
        isActive && (
          <button onClick={
            () => {
              if (metaMask?.deactivate) {
                void metaMask?.deactivate()
              } else {
                void metaMask.resetState()
              }
            }
          }>
            disconnect
          </button>
        )
      }
    </div>
  )
}