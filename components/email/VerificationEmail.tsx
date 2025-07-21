import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';
import config from '@/config';

interface VerificationEmailProps {
	url: string;
	host: string;
}

export const VerificationEmail = ({
	url,
	host,
}: VerificationEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Sign in to {host}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>🪄 Sign in to {config.metadata.title}</Heading>
					<Section style={body}>
						<Text style={paragraph}>
							<Link style={link} href={url} target="_blank">
								👉 Click here to sign in 👈
							</Link>
						</Text>
						<Text style={paragraph}>
							If you did not request this email you can safely ignore it.
						</Text>
					</Section>
					<Text style={paragraph}>
						Best,
						<br />- {config.metadata.title} Team
					</Text>
					<Hr style={hr} />
					<Text style={footer}>{config.metadata.title}</Text>
				</Container>
			</Body>
		</Html>
	);
};

VerificationEmail.PreviewProps = {
	url: 'https://example.com/login',
	host: 'example.com',
} as VerificationEmailProps;

export default VerificationEmail;

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: '0 auto',
	padding: '20px 25px 48px',
	backgroundColor: '#ffffff',
	maxWidth: '600px',
	borderRadius: '5px',
	boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const heading = {
	fontSize: '28px',
	fontWeight: 'bold',
	marginTop: '48px',
};

const body = {
	margin: '24px 0',
};

const paragraph = {
	fontSize: '16px',
	lineHeight: '26px',
};

const link = {
	color: '#FF6363',
};

const hr = {
	borderColor: '#dddddd',
	marginTop: '48px',
};

const footer = {
	color: '#8898aa',
	fontSize: '12px',
	marginLeft: '4px',
};
