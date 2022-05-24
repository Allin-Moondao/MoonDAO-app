import { nationPassportNFTIssuer } from './config'
import networkToId from './network-id'
import { useSignTypedData } from './use-wagmi'

export const domain = {
  name: 'PassportIssuer',
  version: '1',
  chainId: networkToId(process.env.NEXT_PUBLIC_CHAIN),
  verifyingContract: nationPassportNFTIssuer,
}

export const types = {
  Agreement: [
    { name: 'statement', type: 'string' },
    { name: 'termsURL', type: 'string' },
  ],
}

export const value = {
  statement: `${process.env.NEXT_PUBLIC_AGREEMENT_STATEMENT}`,
  termsURL: `${process.env.NEXT_PUBLIC_AGREEMENT_URL}`,
}

export function useSignAgreement({ onSuccess }: { onSuccess: Function }) {
  return useSignTypedData({
    domain,
    types,
    value,
    onSuccess,
  })
}

export async function storeSignature(signature: string, tx: string) {
  console.log(signature)
  const response = await fetch('/api/store-signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ signature, tx }),
  })
  return response.json()
}
