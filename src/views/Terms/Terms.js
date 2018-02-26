import React, {Component} from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";

export default class Terms extends Component {

  render() {
    const { route } = this.props;

    let url = route.meta.site_url;
    let owner = route.meta.site_owner;

    return (
      <div className="Terms">
        <Helmet
          title={route.meta.site_name}
          meta={ [
            { name: "description", content: this.props.route.meta.meta_about },
            { property: "og:title", content: ''},
            { property: "og:url", content: ''},
            { property: "og:image", content: ''},
          ] }
        />
        <h1>Terms & Conditions</h1>
        <h4>Last Updated 02/25/2018</h4>
        <p>
        { url } is owned and operated by { owner }. Throughout the site, the terms “we”, “us” and “our” refer to { owner }. { owner } offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here. If you disagree with these terms and conditions or any part of these terms and conditions, you are not permitted to use this website.
        </p>
        <h3>
        Intellectual property rights
        </h3>
        <p>
        Unless otherwise stated or agreed upon, we are the owner or the licensee of all intellectual property rights in the Website, and in the material published on it. For the purposes of these General Terms, “material” means material including, without limitation, text, graphics, images, video and sound material. Those works are protected by copyright and other intellectual property laws and treaties around the world. All such rights are reserved.
        </p>
        <p>
        Client work reproduced on this website is subject to its own terms agreed upon between { owner } and that party. These terms and conditions apply for all other parties.
        </p>
        <p>
        You may view, download for caching purposes only, and print pages or other content from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
        </p>
        <p>
        You are not allowed to do any of the following without our explicit prior permission.
        </p>
        <p>
        A - Republish, distribute, transmit or disseminate any part of the material from this website (including republication on another website);
        </p>
        <p>
        B - Sell, rent or sub-license material from the website;
        </p>
        <p>
        C - Show any material from the website in public;
        </p>
        <p>
        D - Reproduce, duplicate, copy or otherwise exploit material on our website for a commercial purpose;
        </p>
        <p>
        E - Edit or otherwise modify the paper or digital copies of any material on the website;
        </p>
        <p>
        F - Download or print the material or extracts from it in a systematic or regular manner or otherwise so as to create a database in electronic or paper format comprising all or part of the material appearing on the Website.
        </p>
        <p>
        If you print off, copy or download any part of the Website in breach of these General Terms, your right to use the Website will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.
        </p>
        <p>
        If you wish to make any use of material on our site, please send us a message using the contact form.
        </p>
        <h3>
        Acceptable Use
        </h3>
        <p>
        You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
        </p>
        <p>
        You must not use our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.
        </p>
        <p>
        You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to our website without our express written consent.
        </p>
        <p>
        You must not use our website to transmit or send unsolicited commercial communications.
        </p>
        <p>
        You must not use our website for any purposes related to marketing without our express written consent.
        </p>
        <h3>
        Indemnity
        </h3>
        <p>
        You hereby indemnify us and undertake to keep us indemnified against any losses, damages, costs, liabilities and expenses (including without limitation legal expenses and any amounts paid by us to a third party in settlement of a claim or dispute on the advice of our legal advisers) incurred or suffered by us arising out of any breach by you of any provision of these terms and conditions, or arising out of any claim that you have breached any provision of these terms and conditions
        </p>
        <h3>
        Breaches of these Terms and Conditions
        </h3>
        <p>
        Without prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way, we may take such action as we deem appropriate to deal with the breach, including suspending your access to the website, prohibiting you from accessing the website, blocking computers using your IP address from accessing the website, contacting your internet service provider to request that they block your access to the website and/or bringing court proceedings against you.
        </p>
        <h3>
        Variation
        </h3>
        <p>
        We may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of our website from the date of the publication of the revised terms and conditions on our website. Please check this page regularly to ensure you are familiar with the current version.
        </p>
        <p>
        We aim to update the Website regularly, and may change the content at any time. If the need arises, we may suspend access to the Website or close it indefinitely. Any of the material on the Website may be out of date at any given time, and we are under no obligation to update such material.
        </p>
        <h3>
        Severability
        </h3>
        <p>
        If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.
        </p>
        <h3>
        Contact
        </h3>
        <p>
        For more information, question about use of material on our site and all other inquiries please send us a message using the <Link to ="/contact">contact form.</Link>
        </p>
      </div>
    )
  }
}
