import React from 'react';
import { Icon } from 'antd';
import files from './FindOutMoreFiles';

import {
  AboutUsWrapper,
  Li,
  Ul,
  Mission,
  Paragraph,
  Summury,
  Heading,
  H3,
  FilesWrapper,
  FileCard,
  FileImage,
  FileTitleWrapper,
  FileTitle,
  Resources,
} from './LandingPage.style';

const AboutUs = () => (
  <AboutUsWrapper>
    <Summury>
      <Heading>About Us</Heading>
    </Summury>

    <H3>Who Are We?</H3>
    <Paragraph>
      Connect 5 has been developed by a unique partnership of academic, clinical
      and public mental health expertise based in Greater Manchester.
    </Paragraph>

    <H3>What is Connect 5?</H3>
    <Paragraph>
      Connect 5 is a workforce training programme, created to upskill non-mental
      health staff to better understand and successfully address mental health
      issues within their everyday practice.
    </Paragraph>
    <Paragraph>
      Connect 5 is an evidenced based collaborative prevention toolkit that
      promotes psychological knowledge, understanding and awareness and the
      development of skills, which empower people to take proactive steps to
      build resilience and look after themselves
    </Paragraph>

    <H3>Connect5 mission?</H3>
    <Paragraph>
      Bringing wellbeing into everyday practice for the whole public facing
      workforce.
    </Paragraph>
    <Paragraph>
      Empowering people to change though collaborative practice and evidenced
      based psychologically informed tools.
    </Paragraph>
    <Paragraph>
      Understanding mental health and wellbeing as an everyday experience whom
      everyone has the skills to understand and change.
    </Paragraph>

    <Mission>
      <Ul>
        <H3 style={{ textAlign: 'center', marginButton: '1rem' }}>
          Connect 5 is a transformative training programme created to:
        </H3>
        <Li>
          1. Connect with the population, to make every contact count –
          integrating active promotion of mental health and wellbeing into
          everyday practice.
        </Li>
        <Li>
          2. Connect with individuals experiencing subthreshold or low levels of
          common mental health problems: helping them help themselves.
        </Li>
        <Li>
          3. Connect with individuals experiencing high levels of mental
          distress and/or suicidality: so they get the right help at the right
          time.
        </Li>
        <Li>
          4. Connect with frontline staff: facilitating peer–to–peer training
          and spreading of innovation through established networks.
        </Li>
        <Li>
          5. Connect with local systems: harnessing local resources, energy and
          assets to drive and sustain social change.
        </Li>
      </Ul>
    </Mission>

    <H3>How does Connect5 work?</H3>
    <Paragraph>1. Delivery to the front facing workforce</Paragraph>
    <Paragraph>
      Connect 5 is an incremental three-session programme, escalating skills
      though each session. The programme underpins the principle of ‘Making
      Every Contact Count’ and supports the aim of making the best use of the
      skills and local contacts of frontline staff. Some staff will just
      undertake session 1, some session 1 & 2 whilst others go on to do all
      three sessions
    </Paragraph>
    <Paragraph>2. Train the trainer delivery</Paragraph>
    <Paragraph>
      Prospective trainers attend the Connect 5 Train the Trainer programme
      delivered by a “Lead Trainer” - an experienced Connect 5 trainer who also
      has expertise in teaching training skills for Connect 5. The
      four-and-a-half-day programme consists of two and a half days of direct
      delivery content and two days of Train the Trainer instructor module.
      During the TtT, participants are taught the underpinning frameworks,
      principles, values and approaches of the Connect 5 programme, as well as
      skills on how to deliver Connect 5 sessions 1, 2 and 3 to peers.
    </Paragraph>

    <H3>Who is connect5 for?</H3>
    <Paragraph>
      Connect 5 is relevant to a wide range of non-specialist frontline staff
      who work with people at risk of poor mental health. It uniquely optimises
      opportunities for building a culture of self-management, prevention and
      improved access to psychological approaches for mental health and
      wellbeing
    </Paragraph>

    <FilesWrapper>
      {files.map(fileArray => (
        <>
          <p>{fileArray.sectionTitle}</p>
          <Resources>
            {fileArray.files.map(file => (
              <div>
                <FileCard>
                  <a
                    href={file.driveLink}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FileImage src={file.thumbnail} />
                    <FileTitleWrapper>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {file.extension === 'pdf' ? (
                          <Icon type="file-pdf" theme="twoTone" />
                        ) : (
                          <Icon type="file-word" theme="twoTone" />
                        )}
                      </div>
                      <FileTitle>{file.fileName}</FileTitle>
                    </FileTitleWrapper>
                  </a>
                </FileCard>
              </div>
            ))}
          </Resources>
        </>
      ))}
    </FilesWrapper>
  </AboutUsWrapper>
);

export default AboutUs;
