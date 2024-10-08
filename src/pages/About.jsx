import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { AiOutlineMail } from "react-icons/ai";
import { useEffect, useState } from "react";
import team from "./TeamData";
import { IoMdSearch } from "react-icons/io";
import { FcCollaboration } from "react-icons/fc";

const About = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const filteredTeam = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-16">
      <div className="container flex justify-center mx-auto pt-16">
        <div>
          <p className="text-gray-100 text-lg text-center font-normal pb-3">
            <FcCollaboration className="w-8 h-8 inline-block mr-2" />
            &nbsp; BUILDING TEAM
          </p>
          <h1 data-aos="fade-up" className="xl:text-4xl text-3xl text-center text-gray-200 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            People Behind the Scenes of the Organization
          </h1>
        </div>
      </div>
      <div className="w-full bg-blue-50 bg-opacity-5 backdrop-blur-sm box-sha-card px-10 pt-10">
        <div className="container mx-auto">
          <div className="flex relative justify-center mb-8">
            <input
            data-aos="zoom-in"
              type="text"
              placeholder="Search by name (or) role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-100 bg-opacity-10 text-gray-50 focus:outline-none focus:bg-white focus:bg-opacity-10 focus:ring-2 focus:ring-cyan-600 pl-10 mb-10 lg:mb-0" // Added pl-10 for padding-left to accommodate the icon
            />

            {/* Add this inside the input tag */}
            <IoMdSearch className="sico absolute left-3 top-3 text-gray-300 pointer-events-none" />
          </div>
          <div
            role="list"
            aria-label="Behind the scenes People "
            className="lg:flex md:flex sm:flex items-center xl:justify-around flex-wrap md:justify-around sm:justify-around lg:justify-around"
          >
            {/* Map over filtered team members */}
            {filteredTeam.map((member, index) => (
              <div
                key={index}
                data-aos="fade-up"
                className="box-sha-card xl:w-1/3 lg:mx-3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
              >
                <div className="rounded-2xl overflow-hidden shadow-md bg-purple-50 bg-opacity-10">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src={member.image}
                        alt={`Display Picture of ${member.name}`}
                        role="img"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <h1 className="uppercase font-bold text-2xl text-center mb-1 text-white">
                      {member.name}
                    </h1>
                    <p className="text-gray-100 abtrole text-sm text-center">
                      {member.role}
                    </p>
                    <p className="text-center text-gray-300 text-base pt-3 font-normal">
                      {member.bio}
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      {/* Render social links */}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          className="mx-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub size={24} color="#718096" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="mx-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter size={24} color="#1DA1F2" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="mx-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin size={24} color="#0077B5" />
                        </a>
                      )}
                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          className="mx-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TiSocialFacebookCircular size={24} color="#3b5998" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="mx-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiOutlineMail size={24} color="#EA4335" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
