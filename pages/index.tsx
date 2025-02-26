import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import { Pane, majorScale, minorScale, Spinner, ArrowLeftIcon, Button, WarningSignIcon } from 'evergreen-ui'
import Link from 'next/link'
import AuthButton from '../lib/hoagie-ui/AuthButton'

export default function Index() {
  const { user, error, isLoading } = useUser();
  let Profile;
  if (isLoading) Profile = <Spinner />;
  else if (error) Profile = <div>{error.message}</div>;
  else if (user) Profile = <Pane>
      <Link href='/app'><Button
        height={56}
        width={majorScale(35)}
        appearance="primary"
        marginBottom={20}
        iconBefore={WarningSignIcon}
      >
          Access the App
      </Button></Link><br />
      <AuthButton variant="logout" />
    </Pane>;
  else Profile = <AuthButton />

  const router = useRouter()
  useEffect(() => {
      const queryParams = new URLSearchParams(location.search)

      if (queryParams.has('code')) {
        queryParams.delete('code')
        queryParams.delete('state')
        // TODO: add support for other params to persist using 
        // queryParam.toString() or remove the queryParams method
        router.replace("/", undefined, { shallow: true })
      }
    }, [])
    return (
      <Pane display="flex" justifyContent="center" alignItems="center" 
      marginX={majorScale(1)}
      paddingBottom={majorScale(4)}
      paddingTop={majorScale(8)}
      >
        <Pane 
            borderRadius={8}
            textAlign="center" 
            elevation={1} 
            background="white" 
            marginX={20} 
            maxWidth="600px" 
            width="100%"
            paddingX="10px"
            paddingTop={majorScale(5)}
            paddingBottom={majorScale(7)}>
            <WarningSignIcon size={100} color="warning"/>
            <h1 className="hoagie">hoagie<b>menus</b></h1>
          <p>Development Version</p>
          <div>
          <Pane 
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop="30px"
          >
          { Profile }
          <Link href='https://hoagie.io'><Button
            height={56}
            width={majorScale(35)}
            appearance="default"
            marginTop={20}
            iconBefore={ArrowLeftIcon}
          >
              <Pane display="flex" className="hoagie">
                Back to
                <Pane marginLeft={minorScale(1)}>
                    hoagie<b>platform</b>
                </Pane>
            </Pane>
          </Button></Link><br />
          </Pane>
        </div>
        </Pane>
      </Pane>
    );
}
