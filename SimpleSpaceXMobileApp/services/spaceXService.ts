import { gql } from '@apollo/client'

const ROCKETS_DATA = gql`
  query GetRockets {
    rockets {
        active
        boosters
        country
        description
        diameter {
            meters
        }
        height {
            meters
        }
        mass {
            kg
        }
        name
        success_rate_pct
        type
    }
  }
`;

export default ROCKETS_DATA;