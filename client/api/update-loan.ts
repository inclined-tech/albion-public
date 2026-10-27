import { gql } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { useMutation } from '@apollo/client/react'
import { GraphQLFormattedError } from 'graphql'
import { UpdateLoanMutation } from '../shared/types'

const UPDATE_LOAN = gql`
  mutation UpdateLoanMutation($id: Int!, $newStatus: LoanStatus!) {
    updateLoan(id: $id, newStatus: $newStatus) {
      id
      status
    }
  }
`

/**
 * Hook to update the status of a loan
 */
export function useUpdateLoan(): () => Promise<
  [
    loan?: UpdateLoanMutation['updateLoan'],
    errors?: readonly GraphQLFormattedError[],
  ]
> {
  const [openLoan] = useMutation<UpdateLoanMutation>(UPDATE_LOAN, {
    errorPolicy: 'all',
  })

  return async () => {
    const result = await openLoan()

    if (result.error) {
      console.error(`Failed to open loan, errors: ${result.error.message}`)

      return [
        undefined,
        result.error instanceof CombinedGraphQLErrors
          ? result.error.errors
          : undefined,
      ]
    }

    if (result.data) {
      return [result.data.updateLoan]
    }

    return [undefined, undefined]
  }
}
